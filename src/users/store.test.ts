import { actionCreators, CREATE_USER, DELETE_USER,
  reducers, UPDATE_USER, USERS_UPDATED } from "./store";

const user = {
  _id: '123',
  firstname: 'abc',
  lastname: 'def'
}

const list = [
  {
    _id: '456',
    firstname: 'hij',
    lastname: 'klm'
  },
  {
    _id: '789',
    firstname: 'nop',
    lastname: 'qrs'
  }
];

describe('store', () => {
  
  describe('actions', () => {

    it('should export action types', () => {
      expect(CREATE_USER).toMatchSnapshot();
      expect(UPDATE_USER).toMatchSnapshot();
      expect(DELETE_USER).toMatchSnapshot();
      expect(USERS_UPDATED).toMatchSnapshot();
    });

  });

  describe('actionCreators', () => {
    
    it('should export actionCreators', () => {
      expect(actionCreators.createUser(user)).toMatchSnapshot();
      expect(actionCreators.deleteUser(user._id)).toMatchSnapshot();
      expect(actionCreators.updateUser(user)).toMatchSnapshot();
      expect(actionCreators.usersUpdated(list)).toMatchSnapshot();
    });

  });

  describe('reducer', () => {

    it('should append when creating a user', () => {
      expect(reducers.users(undefined, actionCreators.createUser(user))).toEqual([user]);
      expect(reducers.users(list, actionCreators.createUser(user))).toEqual([...list, user]);
    });

    it('should replace when updating a user', () => {
      const update = {
        _id: '456',
        firstname: 'updated',
        lastname: 'user'
      };
      expect(reducers.users(undefined, actionCreators.updateUser(update))).toEqual([]);
      expect(reducers.users(list, actionCreators.updateUser(update))).toEqual(
        list.map(u => u._id === update._id ? Object.assign({}, u, update) : u)
      );
      expect(reducers.users(list, actionCreators.updateUser(user))).toEqual(list);
    });

    it('should remove when deleting a user', () => {
      expect(reducers.users(undefined, actionCreators.deleteUser('456'))).toEqual([]);
      expect(reducers.users(list, actionCreators.deleteUser('456'))).toEqual(
        list.filter(u => u._id !== '456')
      );
      expect(reducers.users(list, actionCreators.deleteUser('123'))).toEqual(list);
    });

    it('should replace all when updating users', () => {
      const newList = [
        {
          _id: '654',
          firstname: 'jih',
          lastname: 'mlk'
        },
        {
          _id: '987',
          firstname: 'pon',
          lastname: 'srq'
        }
      ];
      expect(reducers.users(undefined, actionCreators.usersUpdated(newList))).toEqual(newList);
      expect(reducers.users(list, actionCreators.usersUpdated(newList))).toEqual(newList);
      expect(reducers.users(list, actionCreators.usersUpdated([]))).toEqual([]);
    });

  });

});