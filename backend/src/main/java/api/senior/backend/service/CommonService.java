package api.senior.backend.service;

import java.util.HashMap;
import java.util.Map;

public interface CommonService {
    public Map<String, Object> login(HashMap<String, Object> params) throws Exception;
}
