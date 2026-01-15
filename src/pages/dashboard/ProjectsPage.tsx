import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { FolderKanban, Plus, PlayCircle, PauseCircle, Trash2, MoreVertical } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

interface Project {
  id: string;
  project_name: string;
  project_type: string;
  status: string;
  description: string;
  created_at: string;
}

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [justCreated, setJustCreated] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    type: 'automation',
    description: ''
  });

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('user_projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setProjects(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading projects:', error);
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!user || !newProject.name) return;

    try {
      const { error } = await supabase
        .from('user_projects')
        .insert({
          user_id: user.id,
          project_name: newProject.name,
          project_type: newProject.type,
          description: newProject.description,
          status: 'draft',
          config: {}
        });

      if (!error) {
        setShowCreateModal(false);
        setNewProject({ name: '', type: 'automation', description: '' });
        setJustCreated(true);
        setTimeout(() => setJustCreated(false), 5000);
        loadProjects();
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleToggleStatus = async (projectId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';

    try {
      const { error } = await supabase
        .from('user_projects')
        .update({ status: newStatus })
        .eq('id', projectId);

      if (!error) {
        loadProjects();
      }
    } catch (error) {
      console.error('Error toggling project status:', error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('user_projects')
        .delete()
        .eq('id', projectId);

      if (!error) {
        loadProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-neon-green bg-neon-green/10 border-neon-green/30';
      case 'paused': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'draft': return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/30';
      default: return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/30';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {justCreated && (
          <div className="bg-neon-green/10 border border-neon-green/30 rounded-xl p-4 animate-fadeIn">
            <p className="text-neon-green font-medium">Project created successfully! Configure it below to get started.</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Projects</h2>
            <p className="text-zinc-400">Manage your AI automation projects</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-400 text-black font-semibold rounded-xl hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-800/50 border border-zinc-700 flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
            <p className="text-zinc-400 mb-6">Create your first AI automation project to get started</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green/10 border border-neon-green/30 text-neon-green rounded-xl hover:bg-neon-green/20 transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{project.project_name}</h3>
                    <span className="text-xs text-zinc-500 uppercase tracking-wide">{project.project_type}</span>
                  </div>
                  <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {project.description && (
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{project.description}</p>
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-medium border rounded-full ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(project.id, project.status)}
                    className="flex-1 px-3 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-sm rounded-lg hover:bg-neon-green/20 transition-all flex items-center justify-center gap-2"
                  >
                    {project.status === 'active' ? (
                      <>
                        <PauseCircle className="w-4 h-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4" />
                        Start
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Create New Project</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
                    placeholder="My AI Project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Project Type</label>
                  <select
                    value={newProject.type}
                    onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
                  >
                    <option value="automation">Automation</option>
                    <option value="voice_agent">Voice Agent</option>
                    <option value="campaign">Campaign</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Description (Optional)</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all resize-none"
                    placeholder="Describe your project..."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewProject({ name: '', type: 'automation', description: '' });
                  }}
                  className="flex-1 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  disabled={!newProject.name}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-neon-green to-emerald-400 text-black font-semibold rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
