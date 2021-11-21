package api.senior.backend.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.Map;

@Mapper
public interface CommonMapper {
    public Map<String,Object> selectMberInfo(HashMap<String,Object> params);
}
