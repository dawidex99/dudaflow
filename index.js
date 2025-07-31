const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(bodyParser.json());

const supabaseUrl = 'https://nevvvpxgahydpxlafmnj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldnZ2cHhnYWh5ZHB4bGFmbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODQxNjEsImV4cCI6MjA2OTU2MDE2MX0.XufrBUVrpC-eVg6cMmolbeNj19UGOFnRcMoQVCwlVDE';
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/submit', async (req, res) => {
  const {
    'your-name': phone,
    'your-email': email,
    'your-message': message
  } = req.body;

  const { data, error } = await supabase
    .from('messages')
    .insert([{ phone, email, message }])
    .select(); // <-- to powoduje, że Supabase zwraca nowo dodany rekord

  console.log('Insert result:', data);
  if (error) {
    console.error('Insert error:', error.message);
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
    console.error('Select error:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server działa na porcie ${PORT}`);
});
