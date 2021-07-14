
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

class AdvertSqlStrings
{
    public static string SelectSql =
        @"SELECT ADV.*, 

        (SELECT STRING_AGG(T3.TITLE, ',') FROM [ADVERT] AS T1
        INNER JOIN [ADVERTAREA] AS T2 ON T1.ID = T2.ADVERT_ID
        INNER JOIN [AREA] AS T3 ON T2.AREA_ID = T3.ID
        WHERE ADV.ID = T1.ID
        ) AS areas,

        (SELECT STRING_AGG(T3.TITLE, ',') FROM [ADVERT] AS T1
        INNER JOIN [ADVERTSECTOR] AS T2 ON T1.ID = T2.ADVERT_ID
        INNER JOIN [SECTOR] AS T3 ON T2.SECTOR_ID = T3.ID
        WHERE ADV.ID = T1.ID
        ) AS sectors,

        (SELECT STRING_AGG(T3.TITLE, ',') FROM [ADVERT] AS T1
        INNER JOIN [ADVERTTAG] AS T2 ON T1.ID = T2.ADVERT_ID
        INNER JOIN [TAG] AS T3 ON T2.TAG_ID = T3.ID
        WHERE ADV.ID = T1.ID
        ) AS tags,

		(SELECT ISNULL(S.FULLNAME,'') + '|' + ISNULL(S.EMAIL,'')+ '|' + ISNULL(S.PHONE,'') + '|' + ISNULL(S.AVATAR,'') + '|' + 
		ISNULL(S.LINE1,'') + '|' + ISNULL(S.LINE2,'') + '|' + ISNULL(S.CITY,'') + '|' + ISNULL(S.COUNTY,'') + '|' + ISNULL(S.REGION,'') + '|' + ISNULL(S.POSTCODE,'') FROM [SELLER] AS S 
		INNER JOIN [ADVERT] AS A ON S.ID = A.SELLER_ID AND A.ID = ADV.ID) AS seller

        FROM [ADVERT] AS ADV";

    public static string SelectFilterSql = SelectSql +
        @"
		WHERE 
			(@MIN_PRICE IS NULL OR (ADV.leaseHoldPrice IS NOT NULL AND ADV.leaseHoldPrice >= @MIN_PRICE) OR (ADV.freeHoldPrice IS NOT NULL AND ADV.freeHoldPrice >= @MIN_PRICE)) AND
			(@MAX_PRICE IS NULL OR (ADV.leaseHoldPrice IS NOT NULL AND ADV.leaseHoldPrice <= @MAX_PRICE) OR (ADV.freeHoldPrice IS NOT NULL AND ADV.freeHoldPrice <= @MAX_PRICE)) AND
			(@AREAS IS NULL OR (SELECT COUNT(0) FROM AdvertArea AS AA WHERE AA.advert_id = ADV.id AND AA.area_id IN (@AREAS)) > 0) AND
			(@SECTORS IS NULL OR (SELECT COUNT(0) FROM AdvertSector AS ASE WHERE ASE.advert_id = ADV.id AND ASE.sector_id IN (@SECTORS)) > 0) AND
			(@TAGS IS NULL OR (SELECT COUNT(0) FROM AdvertTag AS ATA WHERE ATA.advert_id = ADV.id AND ATA.tag_id IN (@TAGS)) > 0)
        ";

    public static string SelectByIdSql = SelectSql + " WHERE CAST(ADV.id AS VARCHAR(50)) = @advert_id";

}

