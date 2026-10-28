import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Key, LogOut, CheckCircle2, Clock, ChevronRight, ShieldCheck, Mail, Phone, X, Plus } from 'lucide-react';
import { useCheckout } from '../contexts/CheckoutContext';
import { formatPrice } from '../utils/currency';

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isPrimary: boolean;
}

export const AccountPage: React.FC = () => {
  const { delivery, lastOrder, updateDeliveryField } = useCheckout();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile' | 'security'>('orders');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: delivery.firstName,
    lastName: delivery.lastName,
    email: delivery.email,
    phone: delivery.phone,
  });
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      firstName: delivery.firstName,
      lastName: delivery.lastName,
      streetAddress: delivery.streetAddress,
      apartment: delivery.apartment,
      city: delivery.city,
      state: delivery.state,
      postalCode: delivery.postalCode,
      country: delivery.country,
      phone: delivery.phone,
      isPrimary: true,
    },
  ]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Address>({
    id: '',
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
    isPrimary: false,
  });

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress({ ...address });
    setIsAddressModalOpen(true);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setNewAddress({
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      streetAddress: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
      isPrimary: false,
    });
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editingAddress.id ? newAddress : addr))
      );
      if (newAddress.isPrimary) {
        updateDeliveryField('firstName', newAddress.firstName);
        updateDeliveryField('lastName', newAddress.lastName);
        updateDeliveryField('streetAddress', newAddress.streetAddress);
        updateDeliveryField('apartment', newAddress.apartment || '');
        updateDeliveryField('city', newAddress.city);
        updateDeliveryField('state', newAddress.state);
        updateDeliveryField('postalCode', newAddress.postalCode);
        updateDeliveryField('country', newAddress.country);
        updateDeliveryField('phone', newAddress.phone);
      }
    } else {
      const addressToSave = { ...newAddress, id: Date.now().toString() };
      setAddresses((prev) => [...prev, addressToSave]);
      if (addressToSave.isPrimary) {
        updateDeliveryField('firstName', addressToSave.firstName);
        updateDeliveryField('lastName', addressToSave.lastName);
        updateDeliveryField('streetAddress', addressToSave.streetAddress);
        updateDeliveryField('apartment', addressToSave.apartment || '');
        updateDeliveryField('city', addressToSave.city);
        updateDeliveryField('state', addressToSave.state);
        updateDeliveryField('postalCode', addressToSave.postalCode);
        updateDeliveryField('country', addressToSave.country);
        updateDeliveryField('phone', addressToSave.phone);
      }
    }
    setIsAddressModalOpen(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleSetPrimary = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isPrimary: addr.id === id,
      }))
    );
    const primaryAddress = addresses.find((addr) => addr.id === id);
    if (primaryAddress) {
      updateDeliveryField('firstName', primaryAddress.firstName);
      updateDeliveryField('lastName', primaryAddress.lastName);
      updateDeliveryField('streetAddress', primaryAddress.streetAddress);
      updateDeliveryField('apartment', primaryAddress.apartment || '');
      updateDeliveryField('city', primaryAddress.city);
      updateDeliveryField('state', primaryAddress.state);
      updateDeliveryField('postalCode', primaryAddress.postalCode);
      updateDeliveryField('country', primaryAddress.country);
      updateDeliveryField('phone', primaryAddress.phone);
    }
  };

  const handleProfileEdit = () => {
    setIsEditingProfile(true);
    setProfileData({
      firstName: delivery.firstName,
      lastName: delivery.lastName,
      email: delivery.email,
      phone: delivery.phone,
    });
  };

  const handleProfileSave = () => {
    updateDeliveryField('firstName', profileData.firstName);
    updateDeliveryField('lastName', profileData.lastName);
    updateDeliveryField('email', profileData.email);
    updateDeliveryField('phone', profileData.phone);
    setIsEditingProfile(false);
  };

  const handleProfileCancel = () => {
    setIsEditingProfile(false);
    setProfileData({
      firstName: delivery.firstName,
      lastName: delivery.lastName,
      email: delivery.email,
      phone: delivery.phone,
    });
  };

  // Realistic sample order history including order IR153720 matching Figma image 2 screen 4
  const sampleOrders = [
    {
      orderNumber: lastOrder?.orderNumber || 'IR153720',
      date: lastOrder?.date || 'Oct 26, 2026',
      total: lastOrder?.total || 440,
      status: 'Preparing',
      itemsCount: lastOrder?.items.length || 2,
      items: lastOrder?.items || [
        {
          productName: 'Pearl Drop Earrings',
          quantity: 1,
          price: 150,
          image: '/assets/1.PNG',
        },
        {
          productName: 'Timeless Pearl Necklace',
          quantity: 1,
          price: 290,
          image: '/assets/5.PNG',
        },
      ],
    },
    {
      orderNumber: 'IR149811',
      date: 'Aug 14, 2026',
      total: 180,
      status: 'Delivered',
      itemsCount: 1,
      items: [
        {
          productName: 'Elegant Gold Hoops',
          quantity: 1,
          price: 180,
          image: '/assets/3.PNG',
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Page Title */}
      <div className="border-b border-[#E7D9CC] pb-6">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A75] font-semibold">
          Client Portal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#30251F] font-light mt-1">
          Account
        </h1>
        <p className="text-xs text-[#827166] mt-1">
          Previewing client profile for <span className="font-medium text-[#30251F]">{delivery.firstName} {delivery.lastName}</span> (Demonstration Profile).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Navigation Card */}
        <div className="lg:col-span-4 bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-5 sm:p-6 shadow-soft space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-[#E7D9CC]">
            <div className="w-14 h-14 rounded-full bg-[#F1E4D8] border border-[#E7D9CC] flex items-center justify-center text-[#B89A75] font-serif text-xl font-medium">
              {delivery.firstName[0]}
              {delivery.lastName[0]}
            </div>
            <div className="min-w-0">
              <h3 className="font-serif text-lg text-[#30251F] truncate">
                {delivery.firstName} {delivery.lastName}
              </h3>
              <p className="text-xs text-[#827166] truncate">{delivery.email}</p>
              
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="space-y-1 font-sans text-xs">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#B89A75] text-[#FFF9F4] font-medium'
                  : 'text-[#30251F] hover:bg-[#F1E4D8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Orders & Tracking</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-[#B89A75] text-[#FFF9F4] font-medium'
                  : 'text-[#30251F] hover:bg-[#F1E4D8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#B89A75] text-[#FFF9F4] font-medium'
                  : 'text-[#30251F] hover:bg-[#F1E4D8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Personal Information</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                activeTab === 'security'
                  ? 'bg-[#B89A75] text-[#FFF9F4] font-medium'
                  : 'text-[#30251F] hover:bg-[#F1E4D8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Key className="w-4 h-4" />
                <span>Login</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8">
          {/* TAB 1: Orders & Tracking matching Figma image 2 screen 4 */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#30251F]">Order History</h3>
                <span className="text-xs text-[#827166]">{sampleOrders.length} orders recorded</span>
              </div>

              {sampleOrders.map((ord) => (
                <div
                  key={ord.orderNumber}
                  className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-5 sm:p-6 shadow-soft space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7D9CC]/70 pb-3">
                    <div>
                      <span className="text-xs text-[#827166]">Order Ref</span>
                      <h4 className="font-mono text-base font-semibold text-[#30251F]">
                        #{ord.orderNumber}
                      </h4>
                    </div>
                    <div>
                      <span className="text-xs text-[#827166]">Date</span>
                      <p className="text-xs font-medium text-[#30251F]">{ord.date}</p>
                    </div>
                    <div>
                      <span className="text-xs text-[#827166]">Total</span>
                      <p className="font-serif text-base font-semibold text-[#30251F]">
                        {formatPrice(ord.total)}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-lg ${
                          ord.status === 'Preparing'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>
                  </div>

                  {/* Stepper Status matching Figma image 2 screen 4 */}
                  <div className="py-2">
                    <div className="flex items-center justify-between max-w-sm mx-auto text-[11px] text-[#827166]">
                      <span className="font-medium text-[#B89A75]">Order Placed</span>
                      <span className="font-medium text-[#B89A75]">Preparing</span>
                      <span className={ord.status === 'Delivered' ? 'text-[#B89A75]' : 'text-[#827166]/50'}>
                        Delivered
                      </span>
                    </div>
                    <div className="relative mt-2 max-w-sm mx-auto">
                      <div className="h-1 bg-[#E7D9CC] rounded-lg" />
                      <div
                        className="absolute top-0 left-0 h-1 bg-[#B89A75] rounded-lg transition-all"
                        style={{ width: ord.status === 'Delivered' ? '100%' : '55%' }}
                      />
                    </div>
                  </div>

                  {/* Ordered items preview */}
                  <div className="space-y-2 pt-2">
                    {ord.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-10 h-10 rounded-lg object-cover bg-[#F1E4D8]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm text-[#30251F] truncate">
                            {item.productName}
                          </p>
                          <p className="text-[#827166]">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-serif font-medium text-[#30251F]">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Saved Addresses matching Figma image 2 screen 1 & 7 */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#30251F]">Saved Addresses</h3>
                <button
                  onClick={handleAddNewAddress}
                  className="text-xs text-[#B89A75] font-medium hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New Address
                </button>
              </div>

              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-6 shadow-soft space-y-4"
                >
                  <div className="flex items-center justify-between">
                    {address.isPrimary && (
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-lg bg-[#B89A75]/15 text-[#96764F]">
                        Primary Residence
                      </span>
                    )}
                    {!address.isPrimary && (
                      <button
                        onClick={() => handleSetPrimary(address.id)}
                        className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-lg border border-[#B89A75] text-[#B89A75] hover:bg-[#B89A75] hover:text-[#FFF9F4] transition-colors"
                      >
                        Set as Primary
                      </button>
                    )}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="text-xs text-[#B89A75] hover:underline"
                      >
                        Edit
                      </button>
                      {!address.isPrimary && (
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="text-xs leading-relaxed space-y-1">
                    <h4 className="font-serif text-base text-[#30251F] font-medium">
                      {address.firstName} {address.lastName}
                    </h4>
                    <p className="text-[#827166]">{address.streetAddress} {address.apartment ? `, ${address.apartment}` : ''}</p>
                    <p className="text-[#827166]">{address.city}, {address.state} {address.postalCode}</p>
                    <p className="text-[#827166]">{address.country}</p>
                    <p className="text-[#827166] pt-1">{address.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Personal Information */}
          {activeTab === 'profile' && (
            <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-6 shadow-soft space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#30251F]">Profile Information</h3>
                {!isEditingProfile && (
                  <button
                    onClick={handleProfileEdit}
                    className="text-xs text-[#B89A75] hover:underline"
                  >
                    Edit
                  </button>
                )}
              </div>

              {!isEditingProfile ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#827166] uppercase tracking-wider mb-1">First Name</label>
                    <div className="p-3 rounded-lg bg-[#F9F2EB] border border-[#E7D9CC] text-[#30251F]">
                      {delivery.firstName}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#827166] uppercase tracking-wider mb-1">Last Name</label>
                    <div className="p-3 rounded-lg bg-[#F9F2EB] border border-[#E7D9CC] text-[#30251F]">
                      {delivery.lastName}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#827166] uppercase tracking-wider mb-1">Email</label>
                    <div className="p-3 rounded-lg bg-[#F9F2EB] border border-[#E7D9CC] text-[#30251F]">
                      {delivery.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#827166] uppercase tracking-wider mb-1">Phone</label>
                    <div className="p-3 rounded-lg bg-[#F9F2EB] border border-[#E7D9CC] text-[#30251F]">
                      {delivery.phone}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#827166] uppercase tracking-wider mb-1.5">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#827166] uppercase tracking-wider mb-1.5">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#827166] uppercase tracking-wider mb-1.5">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#827166] uppercase tracking-wider mb-1.5">Phone</label>
                    <input
                      type="text"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                    />
                  </div>
                  <div className="sm:col-span-2 pt-2 flex gap-3">
                    <button
                      onClick={handleProfileSave}
                      className="px-6 py-2.5 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-xs uppercase tracking-wider font-medium hover:bg-[#96764F]"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleProfileCancel}
                      className="px-6 py-2.5 rounded-lg border border-[#E7D9CC] text-xs uppercase tracking-wider text-[#827166] hover:bg-[#F1E4D8]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Sign In & Registration UI */}
          {activeTab === 'security' && (
            <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-6 shadow-soft space-y-6">
              <h3 className="font-serif text-2xl text-[#30251F]">Authentication Interface</h3>
              <p className="text-xs text-[#827166]">
                This clean UI is prepared for future backend session authentication (e.g. Supabase, Firebase, or Clerk).
              </p>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#827166] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={delivery.email}
                    className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#827166] mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-xs uppercase tracking-wider font-medium hover:bg-[#96764F]"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-lg border border-[#E7D9CC] text-xs uppercase tracking-wider text-[#827166] hover:bg-[#F1E4D8]"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#30251F]/40 backdrop-blur-sm"
            onClick={() => setIsAddressModalOpen(false)}
          />
          <div className="relative bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-6 shadow-modal max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl text-[#30251F]">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="p-2 rounded-lg text-[#827166] hover:text-[#30251F] hover:bg-[#F1E4D8]/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#827166] uppercase tracking-wider mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={newAddress.firstName}
                    onChange={(e) => setNewAddress({ ...newAddress, firstName: e.target.value })}
                    className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                  />
                </div>
                <div>
                  <label className="block text-[#827166] uppercase tracking-wider mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={newAddress.lastName}
                    onChange={(e) => setNewAddress({ ...newAddress, lastName: e.target.value })}
                    className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#827166] uppercase tracking-wider mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  value={newAddress.streetAddress}
                  onChange={(e) => setNewAddress({ ...newAddress, streetAddress: e.target.value })}
                  className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                />
              </div>

              <div>
                <label className="block text-[#827166] uppercase tracking-wider mb-1.5">
                  Apartment (Optional)
                </label>
                <input
                  type="text"
                  value={newAddress.apartment}
                  onChange={(e) => setNewAddress({ ...newAddress, apartment: e.target.value })}
                  className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#827166] uppercase tracking-wider mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                  />
                </div>
                <div>
                  <label className="block text-[#827166] uppercase tracking-wider mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#827166] uppercase tracking-wider mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={newAddress.postalCode}
                    onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                    className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                  />
                </div>
                <div>
                  <label className="block text-[#827166] uppercase tracking-wider mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#827166] uppercase tracking-wider mb-1.5">
                  Phone
                </label>
                <input
                  type="text"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-xs text-[#30251F] focus:outline-none focus:border-[#B89A75]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isPrimary"
                  checked={newAddress.isPrimary}
                  onChange={(e) => setNewAddress({ ...newAddress, isPrimary: e.target.checked })}
                  className="w-4 h-4 rounded border-[#E7D9CC] text-[#B89A75] focus:ring-[#B89A75]"
                />
                <label htmlFor="isPrimary" className="text-[#827166]">
                  Set as primary address
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={handleSaveAddress}
                  className="flex-1 px-6 py-2.5 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-xs uppercase tracking-wider font-medium hover:bg-[#96764F]"
                >
                  Save Address
                </button>
                <button
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-6 py-2.5 rounded-lg border border-[#E7D9CC] text-xs uppercase tracking-wider text-[#827166] hover:bg-[#F1E4D8]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
