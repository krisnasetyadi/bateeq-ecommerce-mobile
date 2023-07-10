import { SUCCESS, REQUEST, FAILURE } from '../actions/action.type';
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  GET_ADDRESS_LIST,
  UPDATE_ADDRESS,
  UPDATE_DEFAULT_ADDRESS,
} from '../constants/address';

const initialState = {
  addressList: {
    loading: true,
    data: [],
  },
  defaultAddress: {
    loading: true,
    data: {},
  },
  actionLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // get list of address
    case REQUEST(GET_ADDRESS_LIST):
      return {
        ...state,
      };
    case SUCCESS(GET_ADDRESS_LIST):
      return {
        ...state,
        addressList: {
          loading: false,
          data: payload?.addresses,
        },
        defaultAddress: {
          loading: false,
          data: payload?.defaultAddress,
        },
      };
    case FAILURE(GET_ADDRESS_LIST):
      return {
        ...state,
        addressList: {
          ...state.addressList,
          loading: false,
        },
        defaultAddress: {
          ...state.defaultAddress,
          loading: false,
        },
      };

    // update action
    case REQUEST(UPDATE_ADDRESS):
      return {
        ...state,
        addressList: {
          loading: true,
          ...state.addressList,
        },
        ...state.defaultAddress,
        actionLoading: true,
      };
    case SUCCESS(UPDATE_ADDRESS):
      return {
        ...state,
        addressList: {
          loading: false,
          ...state.addressList,
        },
        ...state.defaultAddress,
        actionLoading: false,
      };
    case FAILURE(UPDATE_ADDRESS):
      return {
        ...state,
        addressList: {
          ...state.addressList,
          loading: false,
        },
        defaultAddress: {
          ...state.defaultAddress,
          loading: false,
        },
        actionLoading: false,
      };

    // update default address
    case REQUEST(UPDATE_DEFAULT_ADDRESS):
      return {
        ...state,
        addressList: {
          loading: true,
          ...state.addressList,
        },

        ...state.defaultAddress,
        actionLoading: true,
      };
    case SUCCESS(UPDATE_DEFAULT_ADDRESS):
      return {
        ...state,
        addressList: {
          loading: false,
          data: [...state.addressList.data.filter(i => i.id !== payload?.id), state?.defaultAddress?.data],
        },
        defaultAddress: {
          loading: false,
          data: state.addressList.data.find(i => i.id === payload?.id),
        },
        actionLoading: false,
      };
    case FAILURE(UPDATE_DEFAULT_ADDRESS):
      return {
        ...state,
        addressList: {
          ...state.addressList,
          loading: false,
        },
        defaultAddress: {
          ...state.defaultAddress,
          loading: false,
        },
        actionLoading: false,
      };

    // create address
    case REQUEST(CREATE_ADDRESS):
      return {
        ...state,
        addressList: {
          loading: true,
          ...state.addressList,
        },
        ...state.defaultAddress,
      };
    case SUCCESS(CREATE_ADDRESS):
      return {
        ...state,
        addressList: {
          loading: false,
          data: [...state.addressList.data, payload],
        },
        ...state.defaultAddress,
      };
    case FAILURE(CREATE_ADDRESS):
      return {
        ...state,
        addressList: {
          ...state.addressList,
          loading: false,
        },
        defaultAddress: {
          ...state.defaultAddress,
          loading: false,
        },
      };

    // delete Address
    case REQUEST(DELETE_ADDRESS):
      return {
        ...state,
        addressList: {
          loading: true,
          ...state.addressList,
        },
        ...state.defaultAddress,
      };
    case SUCCESS(DELETE_ADDRESS):
      return {
        ...state,
        addressList: {
          loading: false,
          data: state.addressList.data.filter(i => i.id !== payload?.id),
        },
        ...state.defaultAddress,
      };
    case FAILURE(DELETE_ADDRESS):
      return {
        ...state,
        addressList: {
          ...state.addressList,
          loading: false,
        },
        defaultAddress: {
          ...state.defaultAddress,
          loading: false,
        },
      };
    default:
      return state;
  }
}
