package api.senior.backend.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface AdminMapper {
    public List<Map<String, Object>> selectMberList(HashMap<String,Object> params);
    public String selectMberListCnt(HashMap<String,Object> params);
    public Map<String, Object> selectMberInfo(HashMap<String,Object> params);
    public String selectMberDplctCnt(HashMap<String,Object> params) throws Exception;
    public int deleteMber(HashMap<String,Object> params);
    public int insertMber(HashMap<String,Object> params);
    public int updateMber(HashMap<String,Object> params);
}
