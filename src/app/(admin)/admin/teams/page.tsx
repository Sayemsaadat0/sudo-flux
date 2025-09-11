"use client";

import { useState } from "react";
import { useGetTeamList, useAddTeam, useUpdateTeam, useDeleteTeam, TeamResponseType } from "@/hooks/teams.hooks";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

export default function TeamsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TeamResponseType | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    bio: "",
    socials: [{ name: "linkedin", url: "" }],
    order: 0,
  });

  const { data: teamsResponse, isLoading } = useGetTeamList();
  const teams = teamsResponse?.data?.data || [];
  const createTeamMutation = useAddTeam();
  const updateTeamMutation = useUpdateTeam(editingTeam?._id || "");
  const deleteTeamMutation = useDeleteTeam(editingTeam?._id || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create FormData for API submission
      const submitFormData = new FormData();
      submitFormData.append('name', formData.name);
      submitFormData.append('title', formData.title);
      submitFormData.append('image', formData.image);
      submitFormData.append('bio', formData.bio);
      submitFormData.append('order', String(formData.order));
      submitFormData.append('socials', JSON.stringify(formData.socials));
      
      if (editingTeam) {
        await updateTeamMutation.mutateAsync(submitFormData);
        toast.success("Team member updated successfully");
      } else {
        await createTeamMutation.mutateAsync(submitFormData);
        toast.success("Team member created successfully");
      }
      
      setIsModalOpen(false);
      setEditingTeam(null);
      resetForm();
    } catch {
      toast.error("Failed to save team member");
    }
  };

  const handleEdit = (team: TeamResponseType) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      title: team.title,
      image: team.image,
      bio: team.bio || "",
      socials: team.socials,
      order: team.order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        await deleteTeamMutation.mutateAsync({} as TeamResponseType);
        toast.success("Team member deleted successfully");
      } catch {
        toast.error("Failed to delete team member");
      }
    }
  };

  const toggleActive = async (team: TeamResponseType) => {
    try {
      // Create FormData for the update
      const formData = new FormData();
      formData.append('isActive', String(!team.isActive));
      
      await updateTeamMutation.mutateAsync(formData);
      toast.success(`Team member ${team.isActive ? "deactivated" : "activated"}`);
    } catch {
      toast.error("Failed to update team member status");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      image: "",
      bio: "",
      socials: [{ name: "linkedin", url: "" }],
      order: 0,
    });
  };

  const addSocial = () => {
    setFormData({
      ...formData,
      socials: [...formData.socials, { name: "", url: "" }],
    });
  };

  const removeSocial = (index: number) => {
    setFormData({
      ...formData,
      socials: formData.socials.filter((_, i) => i !== index),
    });
  };

  const updateSocial = (index: number, field: string, value: string) => {
    const updatedSocials = [...formData.socials];
    updatedSocials[index] = { ...updatedSocials[index], [field]: value };
    setFormData({ ...formData, socials: updatedSocials });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading team members...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-sudo-neutral-6">Team Management</h1>
          <p className="text-sudo-neutral-4">Manage your team members</p>
        </div>
        <Button
          onClick={() => {
            setEditingTeam(null);
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-sudo-blue-6 text-white hover:bg-sudo-blue-7"
          label="Add Team Member"
          icon={<Plus size={18} />}
        />
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams?.map((team: TeamResponseType) => (
          <div
            key={team._id}
            className={`bg-white rounded-lg border p-6 ${
              !team.isActive ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Image
                  src={team.image}
                  alt={team.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-sudo-neutral-6">{team.name}</h3>
                  <p className="text-sm text-sudo-neutral-4">{team.title}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleActive(team)}
                  className="p-1 text-sudo-neutral-4 hover:text-sudo-blue-6"
                  title={team.isActive ? "Deactivate" : "Activate"}
                >
                  {team.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => handleEdit(team)}
                  className="p-1 text-sudo-neutral-4 hover:text-sudo-blue-6"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-sudo-neutral-4 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            {team.bio && (
              <p className="text-sm text-sudo-neutral-4 mb-4 line-clamp-3">
                {team.bio}
              </p>
            )}
            
            <div className="flex flex-wrap gap-2">
              {team.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-sudo-neutral-2 text-sudo-neutral-6 px-2 py-1 rounded"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingTeam ? "Edit Team Member" : "Add Team Member"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL *</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 h-20"
                  placeholder="Brief description about the team member"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Social Links</label>
                {formData.socials.map((social, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Platform (e.g., linkedin, twitter)"
                      value={social.name}
                      onChange={(e) => updateSocial(index, "name", e.target.value)}
                      className="flex-1 border rounded-lg px-3 py-2"
                    />
                    <input
                      type="url"
                      placeholder="URL"
                      value={social.url}
                      onChange={(e) => updateSocial(index, "url", e.target.value)}
                      className="flex-1 border rounded-lg px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeSocial(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSocial}
                  className="text-sudo-blue-6 hover:text-sudo-blue-7 text-sm"
                >
                  + Add Social Link
                </button>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingTeam(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-sudo-neutral-3 text-sudo-neutral-6 rounded-lg hover:bg-sudo-neutral-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createTeamMutation.isPending || updateTeamMutation.isPending}
                  className="px-4 py-2 bg-sudo-blue-6 text-white rounded-lg hover:bg-sudo-blue-7 disabled:opacity-50"
                >
                  {createTeamMutation.isPending || updateTeamMutation.isPending
                    ? "Saving..."
                    : editingTeam
                    ? "Update"
                    : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
