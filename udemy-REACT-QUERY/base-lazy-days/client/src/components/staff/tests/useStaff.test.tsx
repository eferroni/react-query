import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../test-utils';
import { useStaff } from '../hooks/useStaff';

test('filter staff', async () => {
  const { result, waitFor } = renderHook(() => useStaff(), {
    wrapper: createQueryClientWrapper(),
  });

  // wait for the staff to be populated
  await waitFor(() => result.current.staff.length === 4);

  // set to show all appointments
  act(() => result.current.setFilter('massage'));

  // wait for the appointments to show more than previous
  await waitFor(() => result.current.staff.length === 3);
});
