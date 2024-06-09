import React from 'react';
import { IOmostRegion } from '../omost_region';
import { Collapse, List, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface RegionPromptProps {
  regions: IOmostRegion[];
  setRegions: (regions: IOmostRegion[]) => void;

  activeRegionIndex: number;
  setActiveRegionIndex: (index: number) => void;
}

const RegionPrompt: React.FC<RegionPromptProps> = ({
  regions, setRegions, activeRegionIndex, setActiveRegionIndex
}) => {
  const removeRegion = (index: number) => {
    const newRegions = regions.slice();
    newRegions.splice(index, 1);
    setRegions(newRegions);
  };

  const removeSuffix = (regionIndex: number, suffixIndex: number) => {
    const newRegions = regions.slice();
    newRegions[regionIndex].suffixes.splice(suffixIndex, 1);
    setRegions(newRegions);
  };

  const changeSuffix = (regionIndex: number, suffixIndex: number, value: React.ChangeEvent<HTMLInputElement>) => {
    const newRegions = regions.slice();
    newRegions[regionIndex].suffixes[suffixIndex] = value.target.value;
    setRegions(newRegions);
  };

  const makeHeader = (region: IOmostRegion, index: number) => {
    const deleteButton = index === 0 ?
      <></> :
      <DeleteOutlined style={{ float: 'right' }} onClick={() => removeRegion(index)} />;

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
      setActiveRegionIndex(-1);
      return;
    }
    const index = parseInt(key as string);
    setActiveRegionIndex(index);
  };

  return (
    <Collapse accordion onChange={onCollapseChange} activeKey={activeRegionIndex.toString()}>
      {
        regions.map((region, index) => {
          return <Collapse.Panel
            key={index}
            header={makeHeader(region, index)}>
            <List size='small'>
              {
                region.suffixes.map((suffix, suffixIndex) => {
                  return <List.Item key={suffixIndex}>
                    <Input value={suffix} onChange={(value) => changeSuffix(index, suffixIndex, value)} />
                    <DeleteOutlined style={{ float: "right", paddingLeft: "10px" }}
                      onClick={() => removeSuffix(index, suffixIndex)} />
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