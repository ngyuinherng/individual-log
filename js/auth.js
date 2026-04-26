const Auth = {
  async signUp(email, password, displayName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName
        }
      }
    });
    if (error) return { success: false, message: error.message };

    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email: email,
        display_name: displayName
      });
    }

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
  },

  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('id', userId)
      .single();
    if (error) return null;
    return data;
  }
};