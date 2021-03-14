import decrypt from './decrypt'

test('decrypt', () => {
  const token = 'VTJGc2RHVmtYMS9seFU3K2FMbDZVb2hHME00bHpyckZFNjRyV3NRYzY3dUd6TG5PQmxlc3plVFY3RmFJT1RrT29NZXRYWVh4TjNkektWSWN0Wk00OGVQeUwyTUsxODZrTHdySlIrMWJLNVU9'

  expect(decrypt(token)).toEqual({
    provider: 'winzap',
    token: 'kh4udpensW9432LldsihTbsEW12457'
  })
});
