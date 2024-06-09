import React from 'react';
import { IOmostRegion } from '../omost_region';
import { Collapse, List } from 'antd';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';

const RegionPrompt: React.FC<{ regions: IOmostRegion[] }> = ({ regions }) => {
    const makeHeader = (region: IOmostRegion) => {
        return <>
            <div style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                backgroundColor: `rgb(${region.color.join(",")})`,
                marginRight: '10px'
            }}></div>
            {region.prefixes[region.prefixes.length - 1]}
        </>;
    };

    return (
        <Collapse accordion>
            {
                regions.map((region, index) => {
                    return <CollapsePanel
                        key={index}
                        header={makeHeader(region)}>
                        <List>
                            {
                                region.suffixes.map((suffix, index) => {
                                    return <List.Item key={index}>
                                        {suffix}
                                    </List.Item>
                                })
                            }
                        </List>
                    </CollapsePanel>
                })
            }
        </Collapse>
    );
};

export default RegionPrompt;