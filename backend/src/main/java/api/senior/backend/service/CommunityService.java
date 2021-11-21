package api.senior.backend.service;

import java.util.HashMap;
import java.util.Map;

public interface CommunityService {
    public Map<String, Object> searchCommunityList(HashMap<String, Object> params) throws Exception;
    public Map<String, Object> searchCommunityInfo(HashMap<String, Object> params) throws Exception;
    public int removeCommunity(HashMap<String, Object> params) throws Exception;
    public int registCommunity(HashMap<String, Object> params) throws Exception;
    public int modifyCommunity(HashMap<String, Object> params) throws Exception;
}
