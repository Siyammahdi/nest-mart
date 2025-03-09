import React from 'react';

interface Props {
  name: string;
  size?: number;
}

export default function Avatar({ name, size = 40 }: Props) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500'
  ];

  // Use a consistent color for each name
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div 
      className={`relative rounded-full overflow-hidden flex items-center justify-center ${bgColor}`}
      style={{ width: size, height: size }}
    >
      <span className="text-white font-medium" style={{ fontSize: size * 0.4 }}>
        {initials}
      </span>
    </div>
  );
} 