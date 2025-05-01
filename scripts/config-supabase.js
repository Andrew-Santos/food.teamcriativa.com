// Configuração inicial do Supabase
const supabaseUrl = 'https://zbvirsjyvybhpusdnjxq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpidmlyc2p5dnliaHB1c2RuanhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDI3OTcsImV4cCI6MjA2MDkxODc5N30.wTP6w7pyZNIWkhuvv2OMLx6kfnh5_-iice8q_141HUE';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
console.log('Supabase client initialized:', supabase);