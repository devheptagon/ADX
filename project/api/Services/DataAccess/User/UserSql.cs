
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;
using adx;

class UserSqlStrings
{
    public static string SelectSql = "sp_select_users";

    public static string SelectByPageSql = "sp_select_users_by_page";

    public static string SelectByCredsSql = "sp_select_user_by_creds";

    public static string SelectByIdSql = "sp_select_user_by_id";

    public static string AddSql = "sp_add_user";

    public static string UpdateSql = "sp_update_user";

    public static string UpdateActivitySql = "sp_update_user_active";

}