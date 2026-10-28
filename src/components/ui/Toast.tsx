import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, Heart, ShoppingBag, X } from 'lucide-react';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'wishlist' | 'info';
}

interface ToastContextType {
  showToast: (title: string, description?: string, type?: 'success' | 'wishlist' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, description?: string, type: 'success' | 'wishlist' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-5 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-4 shadow-modal flex items-start gap-3 transform transition-all duration-300 animate-in fade-in slide-in-from-top-3"
          >
            <div className="w-8 h-8 rounded-full bg-[#F1E4D8] flex items-center justify-center flex-shrink-0 text-[#B89A75]">
              {toast.type === 'wishlist' ? (
                <Heart className="w-4 h-4 fill-[#B89A75]" />
              ) : toast.type === 'info' ? (
                <ShoppingBag className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="text-sm font-medium text-[#30251F] font-serif tracking-wide">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-[#827166] mt-0.5 line-clamp-2">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#827166] hover:text-[#30251F] p-1 -mr-1 -mt-1 rounded-lg"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
