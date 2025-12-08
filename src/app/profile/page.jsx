"use client";

import { useState, useEffect } from "react";
import ProfileHeader from "@/components/(profile)/ProfileHeader";
import ProfileAvatar from "@/components/(profile)/ProfileAvatar";
import ContactInfoSection from "@/components/(profile)/ContactInfoSection";
import GeneralInfoSection from "@/components/(profile)/GeneralInfoSection";
import PasswordUpdateSection from "@/components/(profile)/PasswordUpdateSection";
import APITokenSection from "@/components/(profile)/APITokenSection";
import LogoutButton from "@/components/(profile)/LogoutButton";
import TokenModal from "@/components/(profile)/TokenModal";
import { showToast } from "nextjs-toast-notify";

export default function ProfilePage() {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  // Form states
  const [contactForm, setContactForm] = useState({
    phone_number: "",
    address: "",
    city: "",
    pincode: ""
  });
  const [generalForm, setGeneralForm] = useState({
    nationality: "",
    birth_date: "",
    organization_name: "",
    organization_type: "",
    joining_date: "",
    role: ""
  });
  const [passwordForm, setPasswordForm] = useState({
    email: "",
    otp: "",
    newpwd: "",
    confirmPassword: ""
  });

  // Track changes
  const [contactChanged, setContactChanged] = useState(false);
  const [generalChanged, setGeneralChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  // Password update flow steps
  const [passwordStep, setPasswordStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Show password toggles
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  });

  // Loading states for save buttons
  const [savingContact, setSavingContact] = useState(false);
  const [savingGeneral, setSavingGeneral] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data.profile);

        // Initialize forms with fetched data
        setContactForm({
          phone_number: data.profile?.phone_number || "",
          address: data.profile?.address || "",
          city: data.profile?.city || "",
          pincode: data.profile?.pincode || ""
        });

        setGeneralForm({
          nationality: data.profile?.nationality || "",
          birth_date: data.profile?.birth_date ? data.profile.birth_date.split('T')[0] : "",
          organization_name: data.profile?.organization_name || "",
          organization_type: data.profile?.organization_type || "",
          joining_date: data.profile?.joining_date ? data.profile.joining_date.split('T')[0] : "",
          role: data.profile?.role || ""
        });

        setPasswordForm({
          email: data.profile.email,
          otp: "",
          newpwd: "",
          confirmPassword: ""
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    setContactChanged(true);
  };

  const handleGeneralChange = (field, value) => {
    setGeneralForm(prev => ({ ...prev, [field]: value }));
    setGeneralChanged(true);
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    if (field !== 'email') {
      setPasswordChanged(true);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const saveContact = async () => {
    setSavingContact(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });

      if (res.ok) {
        showToast.success("Contact information updated successfully!", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
        setContactChanged(false);
        await fetchProfile();
      } else {
        const error = await res.json();
        showToast.error("Failed to update contact information", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      showToast.error("Failed to update contact information", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
    } finally {
      setSavingContact(false);
    }
  };

  const saveGeneral = async () => {
    setSavingGeneral(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generalForm)
      });

      if (res.ok) {
        showToast.success("General information updated successfully!", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
        setGeneralChanged(false);
        await fetchProfile();
      } else {
        const error = await res.json();
        showToast.error("Failed to update general information", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
      }
    } catch (error) {
      console.error("Error updating general info:", error);
      showToast.error("Failed to update general information", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
    } finally {
      setSavingGeneral(false);
    }
  };

  const requestOTP = async () => {
    setSavingPassword(true);
    try {
      const res = await fetch("/api/auth/emailcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: passwordForm.email })
      });

      if (res.ok) {
        showToast.success("OTP sent to your email!", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
        setOtpSent(true);
        setPasswordStep(2);
      } else {
        showToast.error("Failed to send OTP", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
      }
    } catch (error) {
      console.error("Error requesting OTP:", error);
      showToast.error("Failed to send OTP. Please try again.", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  const verifyOTP = async () => {
    if (!passwordForm.otp || passwordForm.otp.length !== 6) {
      showToast.error("Please enter a valid 6-digit OTP", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
      return;
    }

    setSavingPassword(true);
    try {
      const res = await fetch("/api/auth/otpcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: passwordForm.email,
          otp: passwordForm.otp
        })
      });

      if (res.ok) {
        showToast.success("OTP verified successfully!", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
        setOtpVerified(true);
        setPasswordStep(3);
      } else {
        showToast.error("Invalid OTP", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      showToast.error("Failed to verify OTP. Please try again.", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  const savePassword = async () => {
    if (passwordForm.newpwd !== passwordForm.confirmPassword) {
      showToast.error("Passwords do not match!", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
      return;
    }

    if (passwordForm.newpwd.length < 6) {
      showToast.error("Password must be at least 6 characters long!", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
      return;
    }

    setSavingPassword(true);
    try {
      const res = await fetch("/api/auth/updatepwd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: passwordForm.email,
          newpwd: passwordForm.newpwd,
          confirmPassword: passwordForm.confirmPassword
        })
      });

      if (res.ok) {
        showToast.success("Password updated successfully!", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
        setPasswordForm(prev => ({
          ...prev,
          otp: "",
          newpwd: "",
          confirmPassword: ""
        }));
        setPasswordChanged(false);
        setPasswordStep(1);
        setOtpSent(false);
        setOtpVerified(false);
      } else {
        showToast.error("Failed to update password", {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      showToast.error("Failed to update password. Please try again.", {
        duration: 3000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  const resetPasswordFlow = () => {
    setPasswordStep(1);
    setOtpSent(false);
    setOtpVerified(false);
    setPasswordForm(prev => ({
      ...prev,
      otp: "",
      newpwd: "",
      confirmPassword: ""
    }));
    setPasswordChanged(false);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-8">
          {/* Animated spinner with rings */}
          <div className="relative w-28 h-28">
            {/* Outer ring with glow */}
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full shadow-lg shadow-primary/20"></div>
            
            {/* Spinning ring 1 */}
            <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full animate-spin"></div>
            
            {/* Spinning ring 2 - opposite direction */}
            <div className="absolute inset-3 border-4 border-transparent border-b-secondary border-l-secondary rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
            
            {/* Inner circle with pulse */}
            <div className="absolute inset-8 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full animate-pulse"></div>
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full animate-ping"></div>
              <div className="absolute w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full shadow-lg shadow-primary/50"></div>
            </div>
          </div>

          {/* Loading text with gradient animation */}
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
              Loading Profile
            </h2>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-lg shadow-primary/50" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-lg shadow-primary/50" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-lg shadow-primary/50" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>

          {/* Shimmer effect cards preview */}
          <div className="w-full max-w-lg space-y-4 mt-6">
            {/* Card 1 - Profile Header Preview */}
            <div className="relative h-24 bg-card/60 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer"></div>
              <div className="p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
                  <div className="h-3 bg-muted/70 rounded w-48 animate-pulse" style={{ animationDelay: '100ms' }}></div>
                </div>
              </div>
            </div>

            {/* Card 2 - Main Content Preview */}
            <div className="relative h-40 bg-card/60 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" style={{ animationDelay: '200ms' }}></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-40 animate-pulse" style={{ animationDelay: '150ms' }}></div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted/70 rounded w-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                  <div className="h-3 bg-muted/70 rounded w-5/6 animate-pulse" style={{ animationDelay: '250ms' }}></div>
                  <div className="h-3 bg-muted/70 rounded w-4/6 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>

            {/* Card 3 - Additional Content Preview */}
            <div className="relative h-28 bg-card/60 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" style={{ animationDelay: '400ms' }}></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-36 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                <div className="flex gap-3">
                  <div className="h-10 bg-muted/70 rounded flex-1 animate-pulse" style={{ animationDelay: '350ms' }}></div>
                  <div className="h-10 bg-muted/70 rounded flex-1 animate-pulse" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 p-6">
      <ProfileHeader />

      <ProfileAvatar username={profile?.username} email={profile?.email} />

      <div className="max-w-6xl mx-auto space-y-6">
        <ContactInfoSection
          contactForm={contactForm}
          contactChanged={contactChanged}
          savingContact={savingContact}
          onContactChange={handleContactChange}
          onSave={saveContact}
        />

        <GeneralInfoSection
          generalForm={generalForm}
          generalChanged={generalChanged}
          savingGeneral={savingGeneral}
          onGeneralChange={handleGeneralChange}
          onSave={saveGeneral}
        />

        <PasswordUpdateSection
          passwordForm={passwordForm}
          passwordStep={passwordStep}
          passwordChanged={passwordChanged}
          savingPassword={savingPassword}
          showPasswords={showPasswords}
          onPasswordChange={handlePasswordChange}
          onRequestOTP={requestOTP}
          onVerifyOTP={verifyOTP}
          onUpdatePassword={savePassword}
          onResetFlow={resetPasswordFlow}
          onTogglePasswordVisibility={togglePasswordVisibility}
        />

        <APITokenSection onGenerateToken={() => setShowTokenModal(true)} />

        <LogoutButton onLogout={handleLogout} />
      </div>

      {showTokenModal && <TokenModal onClose={() => setShowTokenModal(false)} />}
    </div>
  );
}
