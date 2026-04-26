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

  async add(text, userId, fileUrls = [], fileTypes = []) {
    const { data, error } = await supabase
      .from('entries')
      .insert({ 
        text, 
        user_id: userId,
        file_urls: fileUrls,
        file_types: fileTypes
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding entry:', error);
      return null;
    }
    return data;
  },

  async update(id, text, fileUrls = null, fileTypes = null) {
    const updates = { text };
    if (fileUrls !== null) updates.file_urls = fileUrls;
    if (fileTypes !== null) updates.file_types = fileTypes;
    
    const { error } = await supabase
      .from('entries')
      .update(updates)
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
  },

  async uploadFile(file, userId) {
    const ext = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${ext}`;
    
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName);

    return publicUrl;
  }
};