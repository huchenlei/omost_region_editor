import React from 'react';
import { IOmostRegion } from '../omost_region';
import { Collapse, List, Input, ColorPicker } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ColorFactory } from 'antd/es/color-picker/color';

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

  const updateRegionColor = (index: number, color: ColorFactory) => {
    const newRegions = regions.slice();
    const rgb = color.toRgb();
    newRegions[index].color = [rgb.r, rgb.g, rgb.b];
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
      <DeleteOutlined style={{ marginLeft: "auto" }} onClick={() => removeRegion(index)} />;

    return <div style={{ display: "flex", alignItems: "center" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ display: "inline-block" }}>
        <ColorPicker
          format={"rgb"}
          value={`rgb(${region.color.join(",")})`}
          onChange={(color) => { updateRegionColor(index, color as ColorFactory) }}
        />
      </div>
      <div style={{ paddingLeft: "10px" }}>{region.prefixes[region.prefixes.length - 1]}</div>
      {deleteButton}
    </div>;
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