const Entries = {
  async getAll() {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching entries:', error);
      return [];
    }
    return data || [];
  },

  async add(text, userId) {
    const { data, error } = await supabase
      .from('entries')
      .insert({ text, user_id: userId })
      .select()
      .single();

    if (error) {
      console.error('Error adding entry:', error);
      return null;
    }
    return data;
  },

  async update(id, text) {
    const { error } = await supabase
      .from('entries')
      .update({ text })
      .eq('id', id);

    if (error) {
      console.error('Error updating entry:', error);
      return false;
    }
    return true;
  },

  async delete(id) {
    const { error } = await supabase
      .from('entries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting entry:', error);
      return false;
    }
    return true;
  }
};