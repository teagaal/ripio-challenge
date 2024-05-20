import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type BitcoinBalance = {
  user: string;
  balance: number;
};

type TransactionStatus = "Completed" | "Failed" | "Pending";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  address: string;
  status: TransactionStatus;
}

interface DashboardState {
  balance: number | null;
  loading: boolean;
  error: string | null;
  arsEquivalent: number | null;
  transactions: Transaction[];
}

const dummyTransactions: Transaction[] = [
  {
    date: "2022-05-10",
    amount: 0.0000012,
    address: "3FZbgi29cpjq2GjdwVLmmHuJJnkLtktZc5",
    status: "Pending",
    id: "123456",
  },
  {
    date: "2022-05-11",
    amount: 0.00001,
    address: "3FZbgi29cpjq2GjdwVLmmHuJJnkLtktZc5",
    status: "Failed",
    id: "789012",
  },
  {
    date: "2022-05-12",
    amount: 0.00000001,
    address: "3FZbgi29cpjq2GjdwVLmmHuJJnkLtktZc5",
    status: "Pending",
    id: "345678",
  },
  {
    date: "2022-05-13",
    amount: 0.0000006,
    address: "3FZbgi29cpjq2GjdwVLmmHuJJnkLtktZc5",
    status: "Completed",
    id: "901234",
  },
  {
    date: "2022-05-14",
    amount: 0.001,
    address: "3FZbgi29cpjq2GjdwVLmmHuJJnkLtktZc5",
    status: "Completed",
    id: "567890",
  },
];

const initialState: DashboardState = {
  balance: null,
  loading: false,
  error: null,
  arsEquivalent: null,
  transactions: dummyTransactions,
};

/**
 * Function to simulate an API call to get the user's current balance
 */
export const fetchBitcoinBalance = createAsyncThunk<BitcoinBalance, string>(
  "balance/fetchBitcoinBalance",
  async (user, { rejectWithValue }) => {
    try {
      return await new Promise<BitcoinBalance>((resolve, reject) => {
        setTimeout(() => {
          resolve({
            user,
            balance: 0.0085,
          });
        }, 500);
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

/**
 * Function to get current ARS_BUY rate from Ripio's API and calculate user's amount in ARS
 */
export const fetchArsEquivalent = createAsyncThunk<number, void>(
  "balance/fetchArsEquivalent",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    if (state.dashboard.balance === null) {
      return rejectWithValue("Balance no disponible");
    }

    try {
      const response = await fetch("https://ripio.com/api/v1/rates/");
      if (!response.ok) {
        throw new Error("Error al buscar los precios");
      }
      const data = await response.json();
      const btcToArsRate = data.rates.ARS_BUY;

      return state.dashboard.balance * btcToArsRate;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

/**
 * Function to simulate an API call to send Bitcoins and update the user's balance
 */
export const sendAmount = createAsyncThunk<number, number>(
  "balance/sendAmount",
  async (totalAmount, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    if (state.dashboard.balance === null) {
      return rejectWithValue("Balance no disponible");
    }

    if (state.dashboard.balance < totalAmount) {
      return rejectWithValue("Balance insuficiente");
    }

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });

      dispatch(decrementBalance(totalAmount));
      return totalAmount;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    decrementBalance: (state, action: PayloadAction<number>) => {
      if (state.balance !== null) {
        state.balance -= action.payload;
      }
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBitcoinBalance.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBitcoinBalance.fulfilled,
        (state, action: PayloadAction<BitcoinBalance>) => {
          state.loading = false;
          state.balance = action.payload.balance;
        },
      )
      .addCase(fetchBitcoinBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchArsEquivalent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchArsEquivalent.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.arsEquivalent = action.payload;
        },
      )
      .addCase(fetchArsEquivalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendAmount.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendAmount.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { decrementBalance, addTransaction } = dashboardSlice.actions;
export default dashboardSlice.reducer;
