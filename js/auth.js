const Auth = {
  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) return { success: false, message: error.message };
    return { success: true };
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) return { success: false, message: error.message };
    return { success: true };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { success: !error };
  },

  async forgotPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return { success: false, message: error.message };
    return { success: true };
  },

  getSession() {
    return supabase.auth.getSession();
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};