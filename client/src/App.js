import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';


function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get('http://localhost:5000/expenses');
    setExpenses(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/expenses', form);
    setForm({ title: '', amount: '', category: '', date: '' });
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/expenses/${id}`);
    fetchExpenses(); // Refresh the list
  } catch (err) {
    console.error('Delete failed:', err.message);
  }



};

const getChartData = () => {
  const categoryTotals = {};

  expenses.forEach((exp) => {
    const amt = parseFloat(exp.amount); // ensure it's a number
    if (categoryTotals[exp.category]) {
      categoryTotals[exp.category] += amt;
    } else {
      categoryTotals[exp.category] = amt;
    }
  });

  return Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount
  }));
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#ff6666'];




  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>💸 Expense Tracker</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required /><br />
        <input name="amount" placeholder="Amount" type="number" value={form.amount} onChange={handleChange} required /><br />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required /><br />
        <input name="date" type="date" value={form.date} onChange={handleChange} required /><br />
        <button type="submit">Add Expense</button>
      </form>

      <h2>Expenses</h2>

      
      <ul>
        
        {expenses.map(exp => (
        <li key={exp._id}>
        {exp.title} - ₹{exp.amount} ({exp.category}) on {new Date(exp.date).toLocaleDateString()}
        &nbsp;
        <button
  onClick={() => deleteExpense(exp._id)}
  style={{
    marginLeft: '10px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
  }}
>
  🗑️ Delete
</button>

        </li>
  ))}
</ul>
{expenses.length > 0 && (
  <>
    <h2>Spending by Category</h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={getChartData()}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {getChartData().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </>
)}

    </div>
  );
}

export default App;
