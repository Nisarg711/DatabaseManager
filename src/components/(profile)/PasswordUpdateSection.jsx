"use client";

import { Key, Mail, Eye, EyeOff, Save } from "lucide-react";

export default function PasswordUpdateSection({
  passwordForm,
  passwordStep,
  passwordChanged,
  savingPassword,
  showPasswords,
  onPasswordChange,
  onRequestOTP,
  onVerifyOTP,
  onUpdatePassword,
  onResetFlow,
  onTogglePasswordVisibility
}) {
  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          <Key className="w-5 h-5 sm:w-6 sm:h-6" />
          Change Password
        </h3>
        {passwordStep === 1 && (
          <button
            onClick={onRequestOTP}
            disabled={savingPassword}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer w-full sm:w-auto">
            {savingPassword ? "Sending..." : "Send OTP"}
          </button>
        )}
        {passwordStep === 2 && (
          <button
            onClick={onVerifyOTP}
            disabled={savingPassword || !passwordForm.otp}
            className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer w-full sm:w-auto">
            {savingPassword ? "Verifying..." : "Verify Your OTP"}
          </button>
        )}
        {passwordStep === 3 && passwordChanged && (
          <button
            onClick={onUpdatePassword}
            disabled={savingPassword}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer w-full sm:w-auto">
            <Save className="w-4 h-4" />
            {savingPassword ? "Updating..." : "Update Password"}
          </button>
        )}
      </div>

      {/* Step Indicator */}
      <div className="mb-6 flex items-center justify-center gap-2 sm:gap-4">
        <div className={`flex items-center gap-2 ${passwordStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${passwordStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            1
          </div>
          <span className="hidden md:inline text-sm font-medium">Request OTP</span>
        </div>
        <div className="w-6 sm:w-12 h-0.5 bg-border"></div>
        <div className={`flex items-center gap-2 ${passwordStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${passwordStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            2
          </div>
          <span className="hidden md:inline text-sm font-medium">Verify OTP</span>
        </div>
        <div className="w-6 sm:w-12 h-0.5 bg-border"></div>
        <div className={`flex items-center gap-2 ${passwordStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${passwordStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            3
          </div>
          <span className="hidden md:inline text-sm font-medium">New Password</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Email Field - Always visible */}
        <div>
          <label htmlFor="password-email" className="block text-sm font-medium text-foreground mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Email
          </label>
          <input
            id="password-email"
            type="email"
            value={passwordForm.email}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-muted/50 cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground mt-1">Click "Send OTP" to receive verification code</p>
        </div>

        {/* OTP Field - Visible after OTP is sent (Step 2) */}
        {passwordStep >= 2 && (
          <div>
            <label htmlFor="password-otp" className="block text-sm font-medium text-foreground mb-2">
              Enter OTP
            </label>
            <input
              id="password-otp"
              type="text"
              value={passwordForm.otp}
              onChange={(e) => onPasswordChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-2 border border-border bg-input-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              disabled={passwordStep > 2}
            />
            <p className="text-xs text-gray-500 mt-1">Check your email for the OTP code (valid for 5 minutes)</p>
            {passwordStep === 2 && (
              <button
                onClick={onResetFlow}
                className="text-xs text-blue-600 hover:underline mt-2 cursor-pointer">
                Didn't receive OTP? Restart process
              </button>
            )}
          </div>
        )}

        {/* Password Fields - Visible after OTP is verified (Step 3) */}
        {passwordStep >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password-new" className="block text-sm font-medium text-foreground mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password-new"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordForm.newpwd}
                  onChange={(e) => onPasswordChange('newpwd', e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-border bg-input-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Enter new password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => onTogglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary cursor-pointer">
                  {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>
            
            <div>
              <label htmlFor="password-confirm" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="password-confirm"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => onPasswordChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-border bg-input-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => onTogglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary cursor-pointer">
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {passwordForm.confirmPassword && passwordForm.newpwd !== passwordForm.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
              )}
            </div>
          </div>
        )}

        {/* Reset button if in middle of flow */}
        {passwordStep > 1 && (
          <div className="pt-4 border-t">
            <button
              onClick={onResetFlow}
              className="text-sm text-muted-foreground hover:text-primary hover:underline cursor-pointer">
              ← Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
