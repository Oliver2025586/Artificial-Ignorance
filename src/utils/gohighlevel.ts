interface ContactData {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  industry?: string;
  serviceNeed?: string;
  challenge?: string;
}

export async function createGHLContact(data: ContactData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials not configured');
      return { success: false, error: 'Configuration missing' };
    }

    let firstName = data.firstName || '';
    let lastName = data.lastName || '';

    if (data.name && !firstName) {
      const parts = data.name.trim().split(' ');
      firstName = parts[0] || '';
      lastName = parts.slice(1).join(' ') || '';
    }

    const payload = {
      firstName: firstName || 'Unknown',
      lastName: lastName || '',
      email: data.email,
      phone: data.phone,
      company: data.company,
      source: data.source || 'Website Form',
      industry: data.industry,
      serviceNeed: data.serviceNeed,
      challenge: data.challenge,
    };

    const response = await fetch(
      `${supabaseUrl}/functions/v1/create-ghl-contact`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Edge Function Error:', errorData);
      return { success: false, error: 'Failed to create contact' };
    }

    const result = await response.json();
    return { success: true };
  } catch (error) {
    console.error('Error creating GHL contact:', error);
    return { success: false, error: 'Network error' };
  }
}
