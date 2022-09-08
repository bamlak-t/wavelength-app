import React, { useState, useRef, useCallback } from 'react';
import { PanResponder, Dimensions } from 'react-native';
import Svg, { Circle, G, Line } from 'react-native-svg';

const CircleSlider = ({
  btnRadius = 15,
  dialRadius = 130,
  meterColor = '#0cd',
  fillColor = 'none',
  strokeColor = '#fff',
  strokeWidth = 0.5,
  value = 0,
  left = 0,
  right = 359,
  xCenter = Dimensions.get('window').width / 2,
  yCenter = Dimensions.get('window').height / 2,
  onValueChange = (x) => x,
}) => {
  const [angle, setAngle] = useState(value);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (e, gs) => {
        let xOrigin = xCenter - (dialRadius + btnRadius);
        let yOrigin = yCenter - (dialRadius + btnRadius);
        let a = cartesianToPolar(gs.moveX - xOrigin, gs.moveY - yOrigin);

        if (a < left && a >= 180) {
          setAngle(left);
        } else if (a > right && a < 180) {
          setAngle(right);
        } else {
          setAngle(a);
        }
      },
    })
  ).current;

  const polarToCartesian = useCallback(
    (angle) => {
      let r = dialRadius;
      let hC = dialRadius + btnRadius;
      let a = ((angle - 90) * Math.PI) / 180.0;

      let x = hC + r * Math.cos(a);
      let y = hC + r * Math.sin(a);
      return { x, y };
    },
    [dialRadius, btnRadius]
  );

  const cartesianToPolar = useCallback(
    (x, y) => {
      let hC = dialRadius + btnRadius;

      if (x === 0) {
        return y > hC ? 0 : 180;
      } else if (y === 0) {
        return x > hC ? 90 : 270;
      } else {
        return Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) + (x > hC ? 90 : 270);
      }
    },
    [dialRadius, btnRadius]
  );

  const width = (dialRadius + btnRadius) * 2;
  const bR = btnRadius;
  const dR = dialRadius;
  var endCoord = polarToCartesian(angle);

  return (
    <Svg width={width} height={width}>
      <Circle
        r={dR}
        cx={width / 2}
        cy={width / 2}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fillColor}
      />
      <Line
        x1={'50%'}
        y1={'50%'}
        x2={endCoord.x}
        y2={endCoord.y}
        stroke={'black'}
        strokeWidth="10"
      />
      <G x={endCoord.x - bR} y={endCoord.y - bR}>
        <Circle r={bR} cx={bR} cy={bR} fill={meterColor} {...panResponder.panHandlers} />
      </G>
      {onValueChange(angle)}
    </Svg>
  );
};

export default React.memo(CircleSlider);
