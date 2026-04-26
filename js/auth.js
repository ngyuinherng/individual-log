const Auth = {
  async signUp(email, password, displayName) {
    console.log('Signing up:', email);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName
        }
      }
    });

    if (error) {
      console.error('SignUp error:', error);
      return { success: false, message: error.message };
    }

    console.log('SignUp response:', data);
    console.log('User:', data?.user);

    if (data.user) {
      console.log('Creating profile for user:', data.user.id);

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: email,
          display_name: displayName
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      } else {
        console.log('Profile created successfully');
      }
    }

    if (data.session) {
      return { success: true };
    }

    return { success: true, message: 'Account created! Please check your email to confirm your account, then sign in.' };
  },

  async signIn(email, password) {
    console.log('Signing in:', email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('SignIn error:', error);
      return { success: false, message: error.message };
    }

    console.log('SignIn response:', data);
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

    if (error) {
      console.error('Get profile error:', error);
      return null;
    }
    return data;
  }
};