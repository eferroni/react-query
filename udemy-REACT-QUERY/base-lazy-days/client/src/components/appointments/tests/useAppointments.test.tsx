import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../test-utils';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentDateMap } from '../types';

// a helper function to get the total number of appointments from an AppointmentDateMap object
const getAppointmentCount = (appointments: AppointmentDateMap) =>
  Object.values(appointments).reduce(
    (runningCount, appointmentsOnDate) =>
      runningCount + appointmentsOnDate.length,
    0,
  );

test('filter appointments by availability', async () => {
  const { result, waitFor } = renderHook(() => useAppointments(), {
    wrapper: createQueryClientWrapper(),
  });

  // wait for the appointments to be populated
  await waitFor(() => getAppointmentCount(result.current.appointments) > 0);
  const filteredAppointmentsLenght = getAppointmentCount(
    result.current.appointments,
  );

  // set to show all appointments
  act(() => result.current.setShowAll(true));

  // wait for the appointments to show more than previous
  await waitFor(
    () =>
      getAppointmentCount(result.current.appointments) >
      filteredAppointmentsLenght,
  );
});
