import React from 'react';

const HabitTracker = ({ habitList, habitData, last7Days, onToggleHabit }) => {
  return (
    <section className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <h4 className="text-xs font-black uppercase text-gray-400 mb-6 tracking-[0.2em] px-1">
        Weekly Habits
      </h4>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-[10px] text-gray-300 uppercase pb-4 font-black">Habit</th>
              {last7Days.map(day => (
                <th key={day} className="text-center text-[10px] text-gray-400 uppercase pb-4 px-1">
                  {day[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {habitList.map(habit => (
              <tr key={habit} className="group">
                <td className="py-3 text-sm font-bold text-gray-600">{habit}</td>
                {last7Days.map(day => {
                  const isActive = habitData[`${habit}-${day}`];
                  return (
                    <td key={day} className="py-3 px-1 text-center">
                      <button 
                        onClick={() => onToggleHabit(habit, day)}
                        aria-label={`Mark ${habit} for ${day}`}
                        className={`w-6 h-6 rounded-md transition-all duration-300 active:scale-75 ${
                          isActive 
                            ? 'bg-green-400 shadow-lg shadow-green-100 border-green-500' 
                            : 'bg-gray-100 border-2 border-transparent hover:border-gray-200'
                        }`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HabitTracker;