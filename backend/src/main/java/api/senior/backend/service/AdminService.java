package api.senior.backend.service;

import java.util.HashMap;
import java.util.Map;

public interface AdminService {
    public Map<String, Object> searchMberList(HashMap<String, Object> params) throws Exception;
    public Map<String, Object> searchMberInfo(HashMap<String, Object> params) throws Exception;
    public String mberDplctChk(HashMap<String, Object> params) throws Exception;
    public int removeMber(HashMap<String, Object> params) throws Exception;
    public int registMber(HashMap<String, Object> params) throws Exception;
    public int modifyMber(HashMap<String, Object> params) throws Exception;
}
