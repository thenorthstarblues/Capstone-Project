import axios from 'axios';
import { setGroups } from './constants_actioncreators/groups';

const onTemplateEnter = (store) => {
  console.log('ayo');
  axios.get('/api/group').then((groups) => {
    console.log('all groups', groups);
    const groupId = groups.data.map(group => group.id);
    store.dispatch(setGroups(groupId));
  });
}
export default onTemplateEnter;