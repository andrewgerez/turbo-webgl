export type ListViewParams = {
  style: Record<string, string | number>;
  dataSource: Array<any>;
  renderRow: (arg: any) => React.ReactNode;
}
