'use client';

import { useState } from 'react';
import { useGetLegalList, useDeleteLegal } from '@/hooks/legal.hooks';
import LegalForm from './_components/LegalForm';
import { toast } from "sonner";
import { Trash2, Eye, Calendar, FileText, Shield, Scale, Copyright } from 'lucide-react';
import Button from '@/components/ui/button';

type TabType = 'privacy' | 'terms' | 'license';

const PrivacyContentPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('privacy');
  const { data: legalResponse, isLoading, refetch } = useGetLegalList();
  const { mutateAsync: deleteLegal } = useDeleteLegal();

  const legalDocuments = legalResponse?.results || [];

  const getTabIcon = (type: TabType) => {
    switch (type) {
      case 'privacy': return <Shield className="w-5 h-5" />;
      case 'terms': return <Scale className="w-5 h-5" />;
      case 'license': return <Copyright className="w-5 h-5" />;
    }
  };

  const getTabLabel = (type: TabType) => {
    switch (type) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms & Conditions';
      case 'license': return 'License';
    }
  };

  const getActiveDocument = (type: TabType) => {
    return legalDocuments.find((doc: any) => doc.type === type && doc.isActive);
  };

  const getDocumentHistory = (type: TabType) => {
    return legalDocuments.filter((doc: any) => doc.type === type).sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteLegal(id);
        toast.success('Document deleted successfully!');
        refetch();
      } catch {
        toast.error('Failed to delete document');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sudo-blue-6 mx-auto mb-4"></div>
          <p className="text-sudo-neutral-4">Loading legal documents...</p>
        </div>
      </div>
    );
  }

  if (!isLoading && !legalResponse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-sudo-neutral-6 mb-4">Error Loading Documents</h3>
          <p className="text-sudo-neutral-4 max-w-md mx-auto mb-6">
            There was an error loading the legal documents. Please try again later.
          </p>
          <Button 
            onClick={() => refetch()} 
            label="Retry"
            variant="primarybtn"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sudo-white-1 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sudo-neutral-6 mb-2">Legal Content Management</h1>
          <p className="text-sudo-neutral-4">Manage your privacy policy, terms & conditions, and license documents</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-sudo-white-3 mb-6">
          <div className="flex border-b border-sudo-white-3">
            {(['privacy', 'terms', 'license'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'text-sudo-blue-6 border-b-2 border-sudo-blue-6 bg-sudo-blue-1'
                    : 'text-sudo-neutral-4 hover:text-sudo-neutral-6 hover:bg-sudo-white-2'
                }`}
              >
                {getTabIcon(tab)}
                {getTabLabel(tab)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {(() => {
              const activeDoc = getActiveDocument(activeTab);
              const history = getDocumentHistory(activeTab);

              return (
                <div className="space-y-6">
                  {/* Active Document Section */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-sudo-neutral-6">
                            Active {getTabLabel(activeTab)}
                          </h3>
                          {activeDoc ? (
                            <p className="text-sm text-sudo-neutral-4">
                              Version {activeDoc.version} • Last updated {formatDate(activeDoc.lastUpdated)}
                            </p>
                          ) : (
                            <p className="text-sm text-sudo-neutral-4">No active document</p>
                          )}
                        </div>
                      </div>
                      <LegalForm type={activeTab} onSuccess={refetch} />
                    </div>

                    {activeDoc ? (
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <h4 className="font-semibold text-sudo-neutral-6 mb-2">{activeDoc.title}</h4>
                        <div 
                          className="prose prose-sm max-w-none text-sudo-neutral-5"
                          dangerouslySetInnerHTML={{ __html: activeDoc.content }}
                        />
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-sudo-white-3">
                          <LegalForm instance={activeDoc} type={activeTab} onSuccess={refetch} />
                          <button
                            onClick={() => handleDelete(activeDoc._id, activeDoc.title)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-sudo-neutral-4">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No active {getTabLabel(activeTab).toLowerCase()} found</p>
                        <p className="text-sm">Create one to get started</p>
                      </div>
                    )}
                  </div>

                  {/* Document History */}
                  {history.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-sudo-neutral-6 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Document History
                      </h3>
                      <div className="space-y-3">
                        {history.map((doc: any) => (
                          <div
                            key={doc._id}
                            className={`bg-white rounded-lg p-4 border transition-all duration-200 ${
                              doc.isActive 
                                ? 'border-green-200 bg-green-50' 
                                : 'border-sudo-white-3 hover:border-sudo-white-4'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-sudo-neutral-6">{doc.title}</h4>
                                  {doc.isActive && (
                                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                      Active
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-sudo-neutral-4">
                                  <span>Version {doc.version}</span>
                                  <span>Created {formatDate(doc.createdAt)}</span>
                                  <span>Updated {formatDate(doc.updatedAt)}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  className="p-2 text-sudo-neutral-4 hover:text-sudo-blue-6 hover:bg-sudo-blue-1 rounded-lg transition-colors"
                                  title="View content"
                                >
                                  <Eye size={16} />
                                </button>
                                <LegalForm instance={doc} type={activeTab} onSuccess={refetch} />
                                <button
                                  onClick={() => handleDelete(doc._id, doc.title)}
                                  className="p-2 text-sudo-neutral-4 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyContentPage;
