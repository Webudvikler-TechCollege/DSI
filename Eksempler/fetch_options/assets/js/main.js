import { loginForm } from './helpers/authorization.js'
import { commentList } from './modules/comments.js'
import { goalDetails, goalList } from './modules/goals.js'

/**
 * Functions call
 */
goalList();

goalDetails(1);

loginForm();
