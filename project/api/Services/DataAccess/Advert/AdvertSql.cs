
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;
using adx;

class AdvertSqlStrings
{
    public static string SelectSql = "sp_select_adverts";

    public static string SelectByPageSql = "sp_select_adverts_by_page";

    public static string SelectByIdSql = "sp_select_adverts_by_id";

    public static string AddSql = "sp_add_advert";

    public static string DeleteSql = "sp_delete_advert";

    public static string UpdateSql = "sp_update_advert";

    public static string RefreshDependenciesSql = "sp_update_advert_dependencies";
}

