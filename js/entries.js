const Entries = {
  async getAll() {
    console.log('Fetching entries...');
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching entries:', error);
      return [];
    }
    console.log('Entries fetched:', data);
    return data || [];
  },

  async add(text, userId) {
    console.log('Adding entry:', text, 'for user:', userId);
    const { data, error } = await supabase
      .from('entries')
      .insert({ text, user_id: userId })
      .select()
      .single();

    if (error) {
      console.error('Error adding entry:', error);
      return null;
    }
    console.log('Entry added:', data);
    return data;
  },

  async delete(id) {
    console.log('Deleting entry:', id);
    const { error } = await supabase
      .from('entries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting entry:', error);
      return false;
    }
    console.log('Entry deleted');
    return true;
  }
};