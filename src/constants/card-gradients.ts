export const CARD_GRADIENTS = [
  {
    id: 'aurora',
    name: 'Aurora',
    value: 'from-blue-400 to-purple-500',
    preview: 'bg-gradient-to-br from-blue-400 to-purple-500',
  },
  {
    id: 'blush',
    name: 'Blush',
    value: 'from-pink-400 to-rose-500',
    preview: 'bg-gradient-to-br from-pink-400 to-rose-500',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    value: 'from-green-400 to-teal-500',
    preview: 'bg-gradient-to-br from-green-400 to-teal-500',
  },
  {
    id: 'sunrise',
    name: 'Sunrise',
    value: 'from-orange-400 to-yellow-500',
    preview: 'bg-gradient-to-br from-orange-400 to-yellow-500',
  },
  {
    id: 'orchid',
    name: 'Orchid',
    value: 'from-purple-400 to-pink-500',
    preview: 'bg-gradient-to-br from-purple-400 to-pink-500',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    value: 'from-cyan-400 to-blue-500',
    preview: 'bg-gradient-to-br from-cyan-400 to-blue-500',
  },
] as const;

export type CardGradient = (typeof CARD_GRADIENTS)[number]['id'];
