import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import reducers from "../reducers/reducer";

const store = configureStore({
    reducer: {
        ...reducers,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export { persistor, store };

export type AppDispatch = typeof store.dispatch;

export default store;

