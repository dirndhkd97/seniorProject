package api.senior.backend.config.typeAlias;

import org.springframework.jdbc.support.JdbcUtils;

import java.util.HashMap;

public class OnListMap extends HashMap {
    @Override
    public Object put(Object key, Object value) {
        String convertKey = JdbcUtils.convertUnderscoreNameToPropertyName(key.toString());
        return super.put(convertKey, value);
    }
}
