const Entries = {
  async getAll() {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return [];
    return data;
  },

  async add(text, userId) {
    const { data, error } = await supabase
      .from('entries')
      .insert({ text, user_id: userId })
      .select()
      .single();
    if (error) return null;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('entries')
      .delete()
      .eq('id', id);
    return !error;
  }
};