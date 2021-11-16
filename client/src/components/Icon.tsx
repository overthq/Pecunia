import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';

// All these icons are Feather Icons.
// Don't want to install @expo/vector-icons because of the potential bloat.
// (Although I'm not sure if it's tree-shaken)

const icons = {
  check: <Path d='M20 6L9 17l-5-5' />,
  'chevron-left': <Path d='M15 18l-6-6 6-6' />,
  'chevron-right': <Path d='M9 18l6-6-6-6' />,
  settings: (
    <>
      <Circle cx={12} cy={12} r={3} />
      <Path d='M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z' />
    </>
  ),
  trash: (
    <Path d='M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' />
  ),
  minus: <Path d='M5 12h14' />,
  plus: <Path d='M12 5v14M5 12h14' />,
  home: (
    <Path d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
  ),
  search: <Path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />,
  user: (
    <Path d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
  )
};

interface IconProps {
  size?: number;
  color?: string;
  name: keyof typeof icons;
  style?: StyleProp<ViewStyle>;
}

export type IconType = keyof typeof icons;

const Icon: React.FC<IconProps> = ({
  size = 24,
  color = '#000000',
  name,
  style
}) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    style={style}
  >
    {icons[name]}
  </Svg>
);

export default Icon;
