import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, CheckCircle, Circle, Flame, Briefcase, Home, BarChart3, BookOpen } from 'lucide-react';
import Quote from "./Quote.jsx";
import CategoryButton from './CategoryButton.jsx';
import HabitTracker from './HabitTracker.jsx';

// task categories
const CATEGORIES = [
  { id: 'Work', label: 'Work', icon: <Briefcase size={14} />, color: 'bg-blue-50 text-blue-600 border-blue-100 shadow-blue-50' },
  { id: 'Personal', label: 'Personal', icon: <Home size={14} />, color: 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-50' },
  { id: 'Academics', label: 'Academics', icon: <BookOpen size={14} />, color: 'bg-purple-50 text-purple-600 border-purple-100 shadow-purple-50' },
  { id: 'Urgent', label: 'Urgent', icon: <Flame size={14} />, color: 'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-50' },
];

const HABIT_LIST = ['LeetCode', 'Development', 'Reading', 'Gym'];

const TodoApp = () => {
  // State
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('productivity-tasks')) || []);
  const [habitData, setHabitData] = useState(() => JSON.parse(localStorage.getItem('habit-streaks')) || {});
  const [input, setInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('Work');
  const [filter, setFilter] = useState('all');

  // Storage
  useEffect(() => {
    localStorage.setItem('productivity-tasks', JSON.stringify(tasks));
    localStorage.setItem('habit-streaks', JSON.stringify(habitData));
  }, [tasks, habitData]);

  // Memoized Calculations
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filter === 'completed') return t.completed;
      if (filter === 'pending') return !t.completed;
      return true;
    });
  }, [tasks, filter]);

  const completionRate = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  }, [tasks]);

  const last7Days = useMemo(() => [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  }).reverse(), []);

  // Handlers
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newTask = { 
      id: crypto.randomUUID(), 
      title: input, 
      category: activeCategory, 
      completed: false, 
      date: new Date().toLocaleDateString() 
    };
    
    setTasks(prev => [newTask, ...prev]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleHabit = (habit, day) => {
    const key = `${habit}-${day}`;
    setHabitData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 font-sans text-gray-800 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-5">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">Hobbyit</h1>
          <p className="text-gray-500 font-medium">Keep the streak alive.</p>
        </div>
        
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 min-w-64">
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
            <BarChart3 size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-1 text-[10px] font-black uppercase text-gray-400 tracking-widest">
              <span>Efficiency</span>
              <span className="text-blue-600 font-bold ml-5">{completionRate}%</span>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-700 ease-out" 
                style={{ width: `${completionRate}%` }} 
              />
            </div>
          </div>
          <div>
            {completionRate==100 ? "bravo 🎉" :"" }
          </div>
        </div>
        
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Tasks */}
        <main className="lg:col-span-8 space-y-8 order-2 lg:order-1">
          <section className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <form onSubmit={handleAddTask} className="space-y-6">
              <input
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="What are we crushing today?"
                className="w-full text-xl font-semibold outline-none placeholder:text-gray-300 py-2 border-b-2 border-transparent focus:border-blue-600 transition-all"
              />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <CategoryButton 
                      key={cat.id} 
                      cat={cat} 
                      activeCategory={activeCategory} 
                      onClick={setActiveCategory} 
                    />
                  ))}
                </div>
                <button type="submit" className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700 transition-all active:scale-95 font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                  <Plus size={20} /> Add
                </button>
              </div>
            </form>
          </section>

          <section className="space-y-6">
            <nav className="flex gap-6 text-sm font-bold text-gray-400 px-2 border-b border-gray-100">
              {['all', 'pending', 'completed'].map((f) => (
                <button 
                  key={f} 
                  onClick={() => setFilter(f)} 
                  className={`capitalize pb-3 transition-all relative ${filter === f ? 'text-gray-900' : 'hover:text-gray-600'}`}
                >
                  {f} {filter === f && <div className="absolute bottom-0 left-0 w-full h-0.75 bg-blue-600 rounded-t-full" />}
                </button>
              ))}
            </nav>

            <div className="space-y-4">
              {filteredTasks.map((task) => {
                const catInfo = CATEGORIES.find(c => c.id === task.category);
                return (
                  <div key={task.id} className={`group flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${task.completed ? 'bg-gray-50/50 border-transparent opacity-60' : 'bg-white border-white shadow-sm hover:translate-x-1 hover:shadow-md'}`}>
                    <div className="flex items-center gap-5">
                      <button onClick={() => toggleTask(task.id)} className="transition-transform active:scale-75">
                        {task.completed ? <CheckCircle className="text-green-500" size={26} /> : <Circle className="text-gray-200 hover:text-blue-500" size={26} />}
                      </button>
                      <div>
                        <h3 className={`font-bold text-lg transition-all ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</h3>
                        <div className={`inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${catInfo?.color}`}>
                          {catInfo?.icon} {catInfo?.label}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => deleteTask(task.id)} className="lg:opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all p-2 rounded-xl hover:bg-red-50">
                      <Trash2 size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        {/* RIGHT: Sidebar */}
          <aside className="lg:col-span-4 space-y-8 order-1 lg:order-2">
            <HabitTracker
              habitList={HABIT_LIST}
              habitData={habitData}
              last7Days={last7Days}
              onToggleHabit={toggleHabit}
            />
            <Quote />
          </aside>
      </div>
    </div>
  );
};

export default TodoApp;