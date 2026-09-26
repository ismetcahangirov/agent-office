  const frame = useCurrentFrame();
  const p = pop(frame, start, 8);
  const count = interpolate(frame, [start, start + 18], [0, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const barW = interpolate(
    frame,
    [start, start + 18],
    [0, (value / 1.45) * 920],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  // Punch the number when the narrator says it
  const pulse = interpolate(
    frame,
    [pulseAt, pulseAt + 5, pulseAt + 14],
    [1, 1.12, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
