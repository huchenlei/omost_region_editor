import React from 'react';
import { IOmostRegion } from '../omost_region';
import { Collapse, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface RegionPromptProps {
  regions: IOmostRegion[];
  removeRegion: (index: number) => void;

  activeRegionIndex: number;
  setActiveRegionIndex: (index: number) => void;
}

const RegionPrompt: React.FC<RegionPromptProps> = (props) => {
  const makeHeader = (region: IOmostRegion, index: number) => {
    const deleteButton = index === 0 ?
      <></> :
      <DeleteOutlined style={{ float: 'right' }} onClick={() => props.removeRegion(index)} />;

    return <>
      <div style={{
        display: 'inline-block',
        width: '20px',
        height: '20px',
        backgroundColor: `rgb(${region.color.join(",")})`,
        marginRight: '10px',
        border: '1px solid black',
      }}></div>
      {region.prefixes[region.prefixes.length - 1]}
      {deleteButton}
    </>;
  };

  const onCollapseChange = (key: string | string[]) => {
    if (key.length === 0) {
      props.setActiveRegionIndex(-1);
      return;
    }
    const index = parseInt(key as string);
    props.setActiveRegionIndex(index);
  };

  return (
    <Collapse accordion onChange={onCollapseChange} activeKey={props.activeRegionIndex.toString()}>
      {
        props.regions.map((region, index) => {
          return <Collapse.Panel
            key={index}
            header={makeHeader(region, index)}>
            <List>
              {
                region.suffixes.map((suffix, index) => {
                  return <List.Item key={index}>
                    {suffix}
                  </List.Item>
                })
              }
            </List>
          </Collapse.Panel>
        })
      }
    </Collapse>
  );
};

export default RegionPrompt;