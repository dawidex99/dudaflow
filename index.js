const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(bodyParser.json());

const supabaseUrl = 'https://nevvvpxgahydpxlafmnj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldnZ2dnB4Z2FoeWRweGxhZm1uaiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzUzOTg0MTYxLCJleHAiOjIwNjk1NjAxNjF9.XufrBUVrpC-eVg6cMmolbeNj19UGOFnRcMoQVCwlVDE';
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/submit', async (req, res) => {
  const { message } = req.body;

  const { data, error } = await supabase
    .from('messages')
    .insert([{ message }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, data });
});

app.get('/messages', async (req, res) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server działa na porcie ${PORT}`);
});

