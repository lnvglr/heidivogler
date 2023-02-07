import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

import { TextInput } from '@strapi/design-system/TextInput'
import { Flex } from '@strapi/design-system/Flex';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import Cell from '../Cell/index.js'

const CELL_WIDTH = 44;


const Field = (props) => {
  const {
    name,
    value,
    attribute,
    onChange,
  } = props;

  const {
    // All our custom field config are here
    placeholder,
    label,
    hint,
  } = attribute.customFieldConfig || {};
  const icon = useRef(value)
  return (
    <>
      <Stack size={1}>
        <Typography
          variant="pi"
          fontWeight="bold"
          textColor="neutral800"
          as="label"
        >
          Font Awesome Icon
        </Typography>
        <Flex>
          <Cell
            style={{ width: CELL_WIDTH, height: CELL_WIDTH }}
          >
            <div style={{ margin: '3px', borderRadius: '4px', width: '100%', height: 'calc(100% - 6px)', backgroundColor: '#ebebf3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon.current && <FontAwesomeIcon icon={[ 'fas', icon.current ]} size="lg" color="rgb(50, 50, 77)" />}
            </div>
          </Cell>
          <TextInput
            id={name}
            placeholder={placeholder}
            aria-label="Font Awesome Icon"
            name={name}
            hint={hint}
            onChange={e => {
              const arg = {
                target: {
                  name,
                  value: e.target.value,
                },
              }
              icon.current = e.target.value
              onChange(arg);
            }}
            value={value}
            style={{ width: '100%' }}
          />
        </Flex>
        <Typography variant="pi"><a href='https://fontawesome.com/search?m=free&s=solid' target='_blank'>Browse Icons</a></Typography>
      </Stack>
    </>
  );
}

export default Field;