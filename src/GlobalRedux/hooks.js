import { useDispatch, useSelector, useStore } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes()
export const useAppSelector = useSelector.withTypes()
export const useAppStore = useStore.withTypes()

// Custom hooks to access Redux state
// export const useAppDispatch = () => useDispatch();
// export const useAppSelector = (selector) => useSelector(selector);

// Auth-specific hooks
export const useAuth = () => useAppSelector((state) => state.auth);