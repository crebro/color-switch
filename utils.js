function getBallCollisionColor(colors, isBottomCollision, rotation) {
  if (rotation > 0 && rotation < 90) {
    return isBottomCollision ? colors[0] : colors[2];
  } else if (rotation > 90 && rotation < 180) {
    return isBottomCollision ? colors[3] : colors[1];
  } else if (rotation > 180 && rotation < 270) {
    return isBottomCollision ? colors[2] : colors[0];
  }
  return isBottomCollision ? colors[1] : colors[3];
}

