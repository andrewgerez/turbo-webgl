import { View } from '@/webgl'
import { FC } from 'react'
import { ListViewParams } from './types';

const ListViewComponent: FC<ListViewParams> = ({ style, renderRow, dataSource }) => {
  if (!dataSource.length) return null

  return (
    <View style={style}>
      {dataSource.map(renderRow)}
    </View>
  );
};

export default ListViewComponent
